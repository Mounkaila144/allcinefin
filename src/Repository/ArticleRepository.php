<?php

namespace App\Repository;

use App\Entity\Article;
use App\Entity\Autorisation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Article::class);
    }

    public function add(Article $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function search($mots = null)
    {
        $query = $this->createQueryBuilder('a');
        if ($mots != null) {
            $query->andWhere('MATCH_AGAINST(a.nom) AGAINST (:mots boolean)>0')
                ->setParameter('mots', $mots);
        }

        return $query->getQuery()->getResult();
    }

    public function alert()
    {
        $query = $this->createQueryBuilder('a');
        $query->Where('a.alert >=a.quantiteInitial - a.quantiteVendue');

        return $query->getQuery()->getResult();
    }

    /**
     * @throws \Doctrine\ORM\NonUniqueResultException
     * @throws \Doctrine\ORM\NoResultException
     */

    public function sum()
    {
        $query = $this->createQueryBuilder('a');
        $query->select('SUM(a.quantiteVendue) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }
    public function Totalvendu()
    {
        $query = $this->createQueryBuilder('a');
        $query->select('SUM(a.price*a.quantiteInitial) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }

    // /**
    //  * @return Article[] Returns an array of Article objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Article
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
