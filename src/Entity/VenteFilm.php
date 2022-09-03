<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VenteFilmRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;


#[ORM\Entity(repositoryClass: VenteFilmRepository::class)]
#[ORM\Index(name: 'venteFlim', columns: ['film'], flags: ['fulltext'])]
#[ApiResource]
class VenteFilm
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Gedmo\Timestampable(on:"create")]
    #[ORM\Column(type: 'datetime')]
    private $updatAt;

    #[ORM\Column(type: 'string', length: 255)]
    private $film;

    #[ORM\Column(type: 'integer')]
    private $prix;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'venteFilms')]
    #[ORM\JoinColumn(nullable: false)]
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUpdatAt(): ?\DateTime
    {
        return $this->updatAt;
    }


    public function getFilm(): ?string
    {
        return $this->film;
    }

    public function setFilm(string $film): self
    {
        $this->film = $film;

        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
