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

class SearchfilmType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('mots', SearchType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'form-control',
                    'placeholder' => 'Entrez un ou plusieurs mots-clés'
                ],
                'required' => false
            ])
            ->add('user', EntityType::class, [
                'class' => User::class,
                'label' => false,
                'attr' => [
                    'class' => 'form-control',
                ],
                'required' => false
            ])
            ->add('from', DateType::class, [
                'label' => false,
                'format' => 'y-M-d',
                'attr' => [
                    'class' => 'form-control',
                ],
                'required' => false
            ])
            ->add('to', DateType::class, [
                'label' => false,
                'format' => 'y-M-d',
                'attr' => [
                    'class' => 'form-control',
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
