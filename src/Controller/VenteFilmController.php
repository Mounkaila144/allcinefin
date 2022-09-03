<?php

namespace App\Controller;

use App\Entity\VenteFilm;
use App\Form\SearchclientType;
use App\Form\SearchfilmType;
use App\Form\VenteFilmType;
use App\Repository\UserRepository;
use App\Repository\VenteFilmRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/vente/film')]
class VenteFilmController extends AbstractController
{
    #[Route('/', name: 'app_vente_film_index', methods: ['GET','POST'])]
    public function index(VenteFilmRepository $venteFilmRepository,Request $request,PaginatorInterface $paginator): Response
    {
        $film = $venteFilmRepository->findAll();
        $film=$paginator->paginate(
            $film, // Requête contenant les données à paginer (ici nos articles)
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            9 // Nombre de résultats par page
        );
        $form = $this->createForm(SearchfilmType::class);

        $search = $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            // On recherche les film correspondant aux mots clés
            $film = $venteFilmRepository->search(
                $search->get('mots')->getData(),
                $search->get('user')->getData(),
                $search->get('from')->getData(),
                $search->get('to')->getData(),

            );
            $film=$paginator->paginate(
                $film, // Requête contenant les données à paginer (ici nos articles)
                $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
                9 // Nombre de résultats par page
            );
        }
        return $this->render('vente_film/index.html.twig', [
            'vente_films' => $film,
            'form' => $form->createView()
        ]);
    }

    #[Route('/new', name: 'app_vente_film_new', methods: ['GET', 'POST'])]
    public function new(Request $request, VenteFilmRepository $venteFilmRepository,UserRepository $userRepository): Response
    {
        $venteFilm = new VenteFilm();
        $form = $this->createForm(VenteFilmType::class, $venteFilm);
        $form->handleRequest($request);
        $id=$this->getUser()->getId();
        $curentuser=$userRepository->find($id);

        if ($form->isSubmitted() && $form->isValid()) {
            $venteFilm->setUser($curentuser);
            $venteFilmRepository->add($venteFilm);
            $film=$form["film"]->getData();
            $prix=$form["prix"]->getData();
            $nom=$curentuser->getNom();


            $this->addFlash('success',"$film , vendu par $nom  a $prix CFA");
            return $this->redirectToRoute('app_vente_film_new', [], Response::HTTP_SEE_OTHER);

        }

        return $this->renderForm('vente_film/new.html.twig', [
            'vente_film' => $venteFilm,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_vente_film_show', methods: ['GET'])]
    public function show(VenteFilm $venteFilm): Response
    {
        return $this->render('vente_film/show.html.twig', [
            'vente_film' => $venteFilm,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_vente_film_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, VenteFilm $venteFilm, VenteFilmRepository $venteFilmRepository): Response
    {
        $form = $this->createForm(VenteFilmType::class, $venteFilm);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $venteFilmRepository->add($venteFilm);
            return $this->redirectToRoute('app_vente_film_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('vente_film/edit.html.twig', [
            'vente_film' => $venteFilm,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_vente_film_delete', methods: ['POST'])]
    public function delete(Request $request, VenteFilm $venteFilm, VenteFilmRepository $venteFilmRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$venteFilm->getId(), $request->request->get('_token'))) {
            $venteFilmRepository->remove($venteFilm);
        }

        return $this->redirectToRoute('app_vente_film_index', [], Response::HTTP_SEE_OTHER);
    }
}
