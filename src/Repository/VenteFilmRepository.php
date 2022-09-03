<?php

namespace App\Repository;

use App\Entity\VenteFilm;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VenteFilm|null find($id, $lockMode = null, $lockVersion = null)
 * @method VenteFilm|null findOneBy(array $criteria, array $orderBy = null)
 * @method VenteFilm[]    findAll()
 * @method VenteFilm[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VenteFilmRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VenteFilm::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(VenteFilm $entity, bool $flush = true): void
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
    public function remove(VenteFilm $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function search($mots = null, $user = null ,$from = null, $to = null){
        $query = $this->createQueryBuilder('a');
        if($mots != null){
            $query->andWhere('MATCH_AGAINST(a.film) AGAINST (:mots boolean)>0')
                ->setParameter('mots', $mots);
        }
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
    // /**
    //  * @return VenteFilm[] Returns an array of VenteFilm objects
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
    public function findOneBySomeField($value): ?VenteFilm
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
