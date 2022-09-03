<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchVenteArticleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('user', EntityType::class, [
                'class' => User::class,
                'label' => 'utilusateur',
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'Utilisateur',
                ],
                'required' => false
            ])
            ->add('from', DateType::class, [
                'label' => 'date debut',
                'format' => 'd-M-y',
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'date debut'
                ],
                'required' => false
            ])
            ->add('to', DateType::class, [
                'label' => "date fin",
                'format' => 'd-M-y',
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'date fin'
                ],
                'required' => false
            ])

            ->add('Rechercher', SubmitType::class, [
                'attr' => [
                    'class' => 'btn-primary',
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
