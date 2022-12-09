<?php

namespace App\Controller;

use App\Entity\VenteArticle;
use App\Form\VenteArticleType;
use App\Repository\ArticleRepository;
use App\Repository\VenteArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('admin/vente/article')]
class VenteArticleController extends AbstractController
{
    #[Route('/', name: 'app_vente_article_index', methods: ['GET'])]
    public function index(VenteArticleRepository $venteArticleRepository): Response
    {
        return $this->render('vente_article/index.html.twig', [
            'vente_articles' => $venteArticleRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_vente_article_new', methods: ['GET', 'POST'])]
    public function new(Request $request, VenteArticleRepository $venteArticleRepository,ArticleRepository $articleRepository): Response
    {

        return $this->renderForm('vente_article/new.html.twig', [
            'articles' => $articleRepository->findBy(['delect'=>false]),
        ]);
    }

 #[Route('/ajouter', name: 'app_add_article_new', methods: ['GET', 'POST'])]
    public function add(Request $request, VenteArticleRepository $venteArticleRepository,ArticleRepository $articleRepository): Response
    {

        return $this->renderForm('vente_article/addStoke.html.twig', [
            'articles' => $articleRepository->findBy(['delect'=>false]),
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
