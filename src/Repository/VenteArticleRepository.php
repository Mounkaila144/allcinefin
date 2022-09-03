<?php

namespace App\Repository;

use App\Entity\VenteArticle;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VenteArticle|null find($id, $lockMode = null, $lockVersion = null)
 * @method VenteArticle|null findOneBy(array $criteria, array $orderBy = null)
 * @method VenteArticle[]    findAll()
 * @method VenteArticle[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VenteArticleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VenteArticle::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(VenteArticle $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(VenteArticle $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }
    public function search($user = null ,$from = null, $to = null){
        $query = $this->createQueryBuilder('a');
        if($user != null){
            $query->leftJoin('a.user','u')
                ->andWhere('u.id=:id')
                ->setParameter('id', $user);
        }
        if ($from != null and $to!=null) {
            $query->andwhere('a.updatAt BETWEEN :from AND :to')
                ->setParameter('from', $from->format('y-m-d').' 00:00:00')
                ->setParameter('to', $to->format('y-m-d').' 23:59:59');
        }

        return $query->getQuery()->getResult();
    }
    public function sum()
    {
        $query = $this->createQueryBuilder('a');
        $query->select('SUM(a.quantite) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }

    public function jour()
    {
        $time=new \DateTime('@'.strtotime('now'));
        $debut=$time->format('y-m-d').' 00:00:00';
        $fin  =$time->format('y-m-d').' 23:59:59';
        $query = $this->createQueryBuilder('a');
        $query
            ->Where("a.updatAt >= '".$debut."'")
            ->andWhere("a.updatAt <= '".$fin."'")
            ->select('SUM(a.quantite) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }
     public function findbyday($d)
    {
        $day=sprintf("%02d",$d);
        $time=new \DateTime('@'.strtotime('now'));
        $debut=$time->format("y-m-$day").' 00:00:00';
        $fin  =$time->format("y-m-$day").' 23:59:59';
        $query = $this->createQueryBuilder('a');
        $query
            ->Where("a.updatAt >= '".$debut."'")
            ->andWhere("a.updatAt <= '".$fin."'")
            ->select('SUM(a.quantite) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }


    public function moi()
    {
        $time = new \DateTime('@' . strtotime('now'));
        $debut = $time->format('y-m-01') . ' 00:00:00';
        $fin = $time->format('y-m-t') . ' 23:59:59';
        $query = $this->createQueryBuilder('a');
        $query
            ->Where("a.updatAt >= '" . $debut . "'")
            ->andWhere("a.updatAt <= '" . $fin . "'")
            ->select('SUM(a.quantite) AS total');


        return $query->getQuery()->getSingleScalarResult();
    }


    // /**
    //  * @return VenteArticle[] Returns an array of VenteArticle objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?VenteArticle
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
