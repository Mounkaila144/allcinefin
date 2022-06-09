<?php

namespace App\Form;

use App\Entity\Pub;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichFileType;

class PubType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom')
            ->add('videoFile', VichFileType::class, [
                'required' => false,
                'allow_delete' => true,
                'delete_label' => '...',
                'download_uri' => '...',
                'download_label' => '...',
                'asset_helper' => true,
            ])
            ->add('imageFile', VichFileType::class, [
                'required' => false,
                'allow_delete' => true,
                'delete_label' => '...',
                'download_uri' => '...',
                'download_label' => '...',
                'asset_helper' => true,
            ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Pub::class,
        ]);
    }
}
