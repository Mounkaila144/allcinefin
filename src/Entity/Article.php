<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Gedmo\Mapping\Annotation as Gedmo;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
#[ORM\Index(name: 'article', columns: ['nom'], flags: ['fulltext'])]
#[Vich\Uploadable]
#[ApiResource]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Gedmo\Timestampable(on:"create")]
    #[ORM\Column(type:"datetime")]
    private $updateAt;

    #[ORM\Column(type: 'integer')]
    private $prisAchat;

    #[ORM\Column(type: 'integer')]
    private $price;

    #[ORM\Column(type: 'integer')]
    private $quantiteInitial;

    #[ORM\Column(type: 'integer')]
    private $quantiteVendue;

    #[ORM\Column(type: 'string', length: 100)]
    private $nom;

    #[ORM\Column(type: 'integer')]
    private $alert;

    public function __toString(): string
    {
        return $this->getNom();
    }


    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     */
    #[Vich\UploadableField(mapping: 'article', fileNameProperty: 'imageName')]
    private ?File $imageFile = null;

    #[ORM\Column(type: 'string')]
    private ?string $imageName = null;

    #[ORM\OneToMany(mappedBy: 'article', targetEntity: VenteArticle::class)]
    private $venteArticles;

    public function __construct()
    {
        $this->venteArticles = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getUpdateAt()
    {
        return $this->updateAt;
    }



    /**
     * If manually uploading a file (i.e. not using Symfony Form) ensure an instance
     * of 'UploadedFile' is injected into this setter to trigger the update. If this
     * bundle's configuration parameter 'inject_on_load' is set to 'true' this setter
     * must be able to accept an instance of 'File' as the bundle will inject one here
     * during Doctrine hydration.
     *
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile|null $imageFile
     */
    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }


    public function getId(): ?int
    {
        return $this->id;
    }


    public function getPrisAchat(): ?int
    {
        return $this->prisAchat;
    }

    public function setPrisAchat(int $prisAchat): self
    {
        $this->prisAchat = $prisAchat;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getQuantiteInitial(): ?int
    {
        return $this->quantiteInitial;
    }

    public function setQuantiteInitial(int $quantiteInitial): self
    {
        $this->quantiteInitial = $quantiteInitial;

        return $this;
    }

    public function getQuantiteVendue(): ?int
    {
        return $this->quantiteVendue;
    }

    public function setQuantiteVendue(int $quantiteVendue): self
    {
        $this->quantiteVendue = $quantiteVendue;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, VenteArticle>
     */
    public function getVenteArticles(): Collection
    {
        return $this->venteArticles;
    }

    public function addVenteArticle(VenteArticle $venteArticle): self
    {
        if (!$this->venteArticles->contains($venteArticle)) {
            $this->venteArticles[] = $venteArticle;
            $venteArticle->setArticle($this);
        }

        return $this;
    }

    public function removeVenteArticle(VenteArticle $venteArticle): self
    {
        if ($this->venteArticles->removeElement($venteArticle)) {
            // set the owning side to null (unless already changed)
            if ($venteArticle->getArticle() === $this) {
                $venteArticle->setArticle(null);
            }
        }

        return $this;
    }
    public function getAlert(): ?int
    {
        return $this->alert;
    }

    public function setAlert(int $alert): self
    {
        $this->alert = $alert;

        return $this;
    }
}
