<?php

namespace App\Controller;

use App\Entity\VenteArticle;
use App\Form\SearchArticleType;
use App\Form\SearchVenteArticleType;
use App\Form\VenteArticleType;
use App\Repository\ArticleRepository;
use App\Repository\VenteArticleRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('admin/vente/article')]
class VenteArticleController extends AbstractController
{
    #[Route('/', name: 'app_vente_article_index', methods: ['GET','POST'])]
    public function index(Request $request,PaginatorInterface $paginator,VenteArticleRepository $venteArticleRepository): Response
    {
        $article = $venteArticleRepository->findAll();

        $form = $this->createForm(SearchVenteArticleType::class);

        $search = $form->handleRequest($request);
        $pagearticles=$paginator->paginate(
            $article, // Requête contenant les données à paginer (ici nos articles)
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            10 // Nombre de résultats par page
        );
        if($form->isSubmitted() && $form->isValid()){
            // On recherche les article correspondant aux mots clés
            $article = $venteArticleRepository->search(
                $search->get('user')->getData(),
                $search->get('from')->getData(),
                $search->get('to')->getData(),

            );
            $pagearticles=$paginator->paginate(
                $article, // Requête contenant les données à paginer (ici nos articles)
                $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
                10 // Nombre de résultats par page
            );
        }

        return $this->render('vente_article/index.html.twig', [
            'vente_articles' => $pagearticles,
            'form' => $form->createView()
        ]);
    }

    #[Route('/new', name: 'app_vente_article_new', methods: ['GET', 'POST'])]
    public function new(Request $request,ArticleRepository $articleRepository,
                        PaginatorInterface $paginator): Response
    {
        $article = $articleRepository->findAll();

        $form = $this->createForm(SearchArticleType::class);

        $search = $form->handleRequest($request);
        $pagearticles=$paginator->paginate(
            $article, // Requête contenant les données à paginer (ici nos articles)
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            5 // Nombre de résultats par page
        );
        if($form->isSubmitted() && $form->isValid()){
            // On recherche les article correspondant aux mots clés
            $article = $articleRepository->search(
                $search->get('mots')->getData(),

            );
            $pagearticles=$paginator->paginate(
                $article, // Requête contenant les données à paginer (ici nos articles)
                $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
                5 // Nombre de résultats par page
            );
        }

        return $this->render('vente_article/new.html.twig', [
            'articles' => $pagearticles,
            'form' => $form->createView()
        ]);
    }

 #[Route('/ajouter', name: 'app_add_article_new', methods: ['GET', 'POST'])]
    public function add(Request $request, PaginatorInterface $paginator,ArticleRepository $articleRepository): Response
    {
        $article = $articleRepository->findAll();

        $form = $this->createForm(SearchArticleType::class);

        $search = $form->handleRequest($request);
        $pagearticles=$paginator->paginate(
            $article, // Requête contenant les données à paginer (ici nos articles)
            $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
            5 // Nombre de résultats par page
        );
        if($form->isSubmitted() && $form->isValid()){
            // On recherche les article correspondant aux mots clés
            $article = $articleRepository->search(
                $search->get('mots')->getData(),

            );
            $pagearticles=$paginator->paginate(
                $article, // Requête contenant les données à paginer (ici nos articles)
                $request->query->getInt('page', 1), // Numéro de la page en cours, passé dans l'URL, 1 si aucune page
                5 // Nombre de résultats par page
            );
        }

        return $this->render('vente_article/addStoke.html.twig', [
            'articles' => $pagearticles,
            'form' => $form->createView()
        ]);
    }



    #[Route('/{id}', name: 'app_vente_article_show', methods: ['GET'])]
    public function show(VenteArticle $venteArticle): Response
    {
        return $this->render('vente_article/show.html.twig', [
            'vente_article' => $venteArticle,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_vente_article_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, VenteArticle $venteArticle, VenteArticleRepository $venteArticleRepository): Response
    {
        $form = $this->createForm(VenteArticleType::class, $venteArticle);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $venteArticleRepository->add($venteArticle);
            return $this->redirectToRoute('app_vente_article_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('vente_article/edit.html.twig', [
            'vente_article' => $venteArticle,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_vente_article_delete', methods: ['POST'])]
    public function delete(Request $request, VenteArticle $venteArticle, VenteArticleRepository $venteArticleRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$venteArticle->getId(), $request->request->get('_token'))) {
            $venteArticleRepository->remove($venteArticle);
        }

        return $this->redirectToRoute('app_vente_article_index', [], Response::HTTP_SEE_OTHER);
    }
}
