<?php

namespace App\Service;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Twig\TwigFunction;

class nb extends AbstractController
{
    private $em;

    /**
     * @param $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function b()
    {
        $a = $this->em->getRepository(Article::class)->createQueryBuilder('a')
            ->andWhere('a.alert >=a.quantiteInitial - a.quantiteVendue')
            ->getQuery()
            ->getResult();
        $auth = [];
        foreach ($a as $as) {
            $auth[] = $as->getId();
        }
        return count($auth);
    }


}