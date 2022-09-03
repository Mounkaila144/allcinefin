<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Pub;
use App\Entity\User;
use App\Entity\VenteFilm;
use App\Repository\UserRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(UserPasswordHasherInterface $hasher,UserRepository $userRepository)
    {
        $this->hasher = $hasher;
        $this->userRepository=$userRepository;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");
        for ($i = 0; $i <= 50; $i++) {
            $article = new Article();
            $article
                ->setNom($faker->userName)
                ->setPrisAchat($faker->numberBetween(3000, 500))
                ->setPrice($faker->numberBetween(3000, 500))
                ->setQuantiteVendue($faker->numberBetween(10, 50))
                ->setQuantiteInitial($faker->numberBetween(50, 400))
                ->setAlert($faker->numberBetween(3,10))
                ->setImageName("1-626f9c40e86e4320259172.png");
            $manager->persist($article);


                $user = new User();
            $password = $this->hasher->hashPassword($user, '90145781');
            $user->setNom($faker->name)
                ->setRoles(["ROLE_ADMIN"])
                    ->setUsername($faker->name)
                    ->setAdresse($faker->address)
                    ->setTelephone($faker->phoneNumber)
                    ->setEmail($faker->email)
                    ->setIsVerified($faker->boolean)
                    ->setPassword($password)
                    ->setLon($faker->latitude(2.13, 2.1309))
                    ->setLat($faker->longitude(13.55, 13.5547))
                    ->setPrenom($faker->lastName);
                $manager->persist($user);
            }

            $manager->flush();
        }
    }
