<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Test;
use Symfony\Component\Security\Core\User\UserInterface;

final class DataPersister implements DataPersisterInterface
{
    private $user;

    public function __construct(EntityManagerInterface $en)
    {
        $this->en = $en;
    }


    public function supports($data): bool
    {
        return $data instanceof Test;
    }

    public function persist($data)
    {
        $data->setNom("bbc");
        $this->en->persist($data);
        $this->en->flush();
    }

    public function remove($data)
    {
        $this->en->remove($data);
        $this->en->flush();
    }

    // Once called this data persister will resume to the next one
    public function resumable(array $context = []): bool
    {
        return true;
    }
}
