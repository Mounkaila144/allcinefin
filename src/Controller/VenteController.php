<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\User;
use App\Entity\VenteArticle;
use App\Form\ArticleType;
use App\Form\UserType;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use App\Repository\VenteArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VenteController extends AbstractController
{
    #[Route('admin/vente', name: 'app_vente')]
    public function index(): Response
    {
        return $this->render('vente/index.html.twig', [
            'controller_name' => 'VenteController',
        ]);
    }
     #[Route('admin/add', name: 'app_add')]
    public function addnew(): Response
    {
        return $this->render('vente/add.html.twig', [
            'controller_name' => 'VenteController',
        ]);
    }

    #[Route('admin/vente/eureur', name: 'app_vente_eureur')]
    public function eurueur(): Response
    {
        return $this->render('vente/post.html.twig', [
            'controller_name' => 'VenteController',
        ]);
    }

    #[Route('admin/vente/{id}', name: 'buy', methods: ['GET', 'POST'])]
    public function edit(VenteArticleRepository $venteArticleRepository,UserRepository $userRepository,int $id,Request $request, Article $article, EntityManagerInterface $entityManager,ArticleRepository $articleRepository): Response
    {
        $userId=$this->getUser()->getId();
        $user=$userRepository->find($userId);
        $artic=$articleRepository->find($id);
        if ($request->getMethod() == 'POST') {
            $v=$request->get("nom");
            $new=$article->getQuantiteVendue()+$v;
            $type=$article->getQuantiteInitial()-$new;
            if ($type<0){
                return $this->redirectToRoute('app_vente_eureur', [], Response::HTTP_SEE_OTHER);

            }
            else{
                $vente=new VenteArticle();
                $vente->setUser($user)
                    ->setArticle($artic)
                    ->setQuantite($v);
                $venteArticleRepository->add($vente);
                $articleRepository->add($article->setQuantiteVendue($new), true);

            }
        }


            return $this->redirectToRoute('app_vente_article_new', [], Response::HTTP_SEE_OTHER);

    }
    #[Route('admin/add/{id}', name: 'add', methods: ['GET', 'POST'])]
    public function add(Request $request, Article $article, EntityManagerInterface $entityManager,ArticleRepository $articleRepository): Response
    {
        if ($request->getMethod() == 'POST') {
            $v=$request->get("nom");
            $new=$article->getQuantiteInitial()+$v;
                $articleRepository->add($article->setQuantiteInitial($new), true);
        }


            return $this->redirectToRoute('app_add_article_new', [], Response::HTTP_SEE_OTHER);

    }
}
