<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Entity\Pub;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");
        for ($i = 0; $i <= 50; $i++) {
            $article = new Article();
            $article
                ->setNom($faker->userName)
                ->setPrisAchat($faker->numberBetween(3000, 500))
                ->setPrice($faker->numberBetween(3000, 500))
                ->setQuantiteInitial($faker->numberBetween(10, 100))
                ->setQuantiteRestant($faker->numberBetween(10, 100))
                ->setQuantiteRestant($faker->numberBetween(10, 100))
                ->setImageName("1-626f9c40e86e4320259172.png");
            $manager->persist($article);


                $user = new User();
                $user->setNom($faker->name)
                    ->setUsername($faker->name)
                    ->setAdresse($faker->address)
                    ->setTelephone($faker->phoneNumber)
                    ->setEmail($faker->email)
                    ->setIsVerified($faker->boolean)
                    ->setPassword("90145781")
                    ->setLon($faker->latitude(2.13, 2.1309))
                    ->setLat($faker->longitude(13.55, 13.5547))
                    ->setPrenom($faker->lastName);
                $manager->persist($user);
            }


            $manager->flush();
        }
    }
