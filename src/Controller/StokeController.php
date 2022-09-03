<?php

namespace App\Controller;

use App\Form\SearchArticleType;
use App\Repository\ArticleRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StokeController extends AbstractController
{
    #[Route('admin/stoke', name: 'app_stoke')]
    public function index(Request $request,ArticleRepository $articleRepository,
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

        return $this->render('stoke/index.html.twig', [
            'articles' => $pagearticles,
            'form' => $form->createView()
        ]);
    }
}
