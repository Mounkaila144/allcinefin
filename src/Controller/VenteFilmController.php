<?php

namespace App\Controller;

use App\Entity\VenteFilm;
use App\Form\VenteFilmType;
use App\Repository\VenteFilmRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/vente/film')]
class VenteFilmController extends AbstractController
{
    #[Route('/', name: 'app_vente_film_index', methods: ['GET'])]
    public function index(VenteFilmRepository $venteFilmRepository): Response
    {
        return $this->render('vente_film/index.html.twig', [
            'vente_films' => $venteFilmRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_vente_film_new', methods: ['GET', 'POST'])]
    public function new(Request $request, VenteFilmRepository $venteFilmRepository): Response
    {
        $venteFilm = new VenteFilm();
        $form = $this->createForm(VenteFilmType::class, $venteFilm);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $venteFilmRepository->add($venteFilm);
            return $this->redirectToRoute('app_vente_film_index', [], Response::HTTP_SEE_OTHER);
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
