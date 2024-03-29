<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home",priority="-1",requirements={"reactRouting"=".+"}, defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('react/index.html.twig', [

        ]);
    }
    /**
     * @Route("/sucess",name="sucess")
     */
    public function inde(): Response
    {
        return $this->render('sucess.html.twig', []);
    }

    /**
     * @Route("/login", name="app_login",priority="-1",requirements={"reactRouting"=".+"}, defaults={"reactRouting": null})
     */
    public function login(): Response
    {
        return $this->render('react/index.html.twig', [

        ]);
    }

}
