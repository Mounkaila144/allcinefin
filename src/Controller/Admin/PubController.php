<?php

namespace App\Controller\Admin;

use App\Entity\Pub;
use App\Form\PubType;
use App\Repository\PubRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('admin/pub',name:'admin_')]
class PubController extends AbstractController
{
    #[Route('/', name: 'pub_index', methods: ['GET'])]
    public function index(PubRepository $pubRepository): Response
    {
        return $this->render('admin/pub/index.html.twig', [
            'pubs' => $pubRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'pub_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $pub = new Pub();
        $form = $this->createForm(PubType::class, $pub);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($pub);
            $entityManager->flush();

            return $this->redirectToRoute('admin_pub_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/pub/new.html.twig', [
            'pub' => $pub,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'pub_show', methods: ['GET'])]
    public function show(Pub $pub): Response
    {
        return $this->render('admin/pub/show.html.twig', [
            'pub' => $pub,
        ]);
    }

    #[Route('/{id}/edit', name: 'pub_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Pub $pub, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PubType::class, $pub);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('admin_pub_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/pub/edit.html.twig', [
            'pub' => $pub,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'pub_delete', methods: ['POST'])]
    public function delete(Request $request, Pub $pub, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$pub->getId(), $request->request->get('_token'))) {
            $entityManager->remove($pub);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_pub_index', [], Response::HTTP_SEE_OTHER);
    }
}
