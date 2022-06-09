<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('admin/vendeur',name:'admin_')]
class VendeurController extends AbstractController
{
    #[Route('/', name: 'vendeur_index', methods: ['GET'])]
    public function index(UserRepository $vendeurRepository): Response
    {
        return $this->render('admin/vendeur/index.html.twig', [
            'clients' => $vendeurRepository->findByRoleThatSucksLess('ADMIN'),
        ]);
    }
   #[Route('/localisation', name: 'vendeur_localisation', methods: ['GET'])]
    public function localisation(UserRepository $vendeurRepository): Response
    {
        return $this->render('admin/vendeur/localisation.html.twig', [
            'clients' => $vendeurRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'vendeur_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $vendeur = new User();
        $form = $this->createForm(UserType::class, $vendeur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($vendeur);
            $entityManager->flush();

            return $this->redirectToRoute('admin_vendeur_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/vendeur/new.html.twig', [
            'vendeur' => $vendeur,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'vendeur_show', methods: ['GET'])]
    public function show(User $vendeur): Response
    {
        return $this->render('admin/vendeur/show.html.twig', [
            'vendeur' => $vendeur,
        ]);
    }

    #[Route('/{id}/edit', name: 'vendeur_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, User $vendeur, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserType::class, $vendeur);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('admin_vendeur_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/vendeur/edit.html.twig', [
            'vendeur' => $vendeur,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'vendeur_delete', methods: ['POST'])]
    public function delete(Request $request, User $vendeur, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$vendeur->getId(), $request->request->get('_token'))) {
            $entityManager->remove($vendeur);
            $entityManager->flush();
        }

        return $this->redirectToRoute('admin_vendeur_index', [], Response::HTTP_SEE_OTHER);
    }
}
