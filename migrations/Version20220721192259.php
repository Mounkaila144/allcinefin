<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220721192259 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, update_at DATETIME NOT NULL, pris_achat INT NOT NULL, price INT NOT NULL, quantite_initial INT NOT NULL, quantite_vendue INT NOT NULL, nom VARCHAR(100) NOT NULL, alert INT NOT NULL, image_name VARCHAR(255) NOT NULL, FULLTEXT INDEX article (nom), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE commande (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, panier LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', INDEX IDX_6EEAA67DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE migration (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE pub (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(50) NOT NULL, image_name VARCHAR(255) NOT NULL, video_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reset_password_request (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, selector VARCHAR(20) NOT NULL, hashed_token VARCHAR(100) NOT NULL, requested_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', expires_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_7CE748AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE test (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, INDEX IDX_D87F7E0CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, nom VARCHAR(50) NOT NULL, prenom VARCHAR(50) NOT NULL, adresse VARCHAR(255) NOT NULL, lon DOUBLE PRECISION NOT NULL, lat DOUBLE PRECISION NOT NULL, is_verified TINYINT(1) NOT NULL, username VARCHAR(50) DEFAULT NULL, telephone VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), FULLTEXT INDEX user (nom, prenom, username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vente_article (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, article_id INT NOT NULL, updat_at DATETIME NOT NULL, quantite INT NOT NULL, INDEX IDX_5D309286A76ED395 (user_id), INDEX IDX_5D3092867294869C (article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vente_film (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, updat_at DATETIME NOT NULL, film VARCHAR(255) NOT NULL, prix INT NOT NULL, INDEX IDX_9215B83EA76ED395 (user_id), FULLTEXT INDEX venteFlim (film), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commande ADD CONSTRAINT FK_6EEAA67DA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748AA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE test ADD CONSTRAINT FK_D87F7E0CA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE vente_article ADD CONSTRAINT FK_5D309286A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE vente_article ADD CONSTRAINT FK_5D3092867294869C FOREIGN KEY (article_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE vente_film ADD CONSTRAINT FK_9215B83EA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vente_article DROP FOREIGN KEY FK_5D3092867294869C');
        $this->addSql('ALTER TABLE commande DROP FOREIGN KEY FK_6EEAA67DA76ED395');
        $this->addSql('ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748AA76ED395');
        $this->addSql('ALTER TABLE test DROP FOREIGN KEY FK_D87F7E0CA76ED395');
        $this->addSql('ALTER TABLE vente_article DROP FOREIGN KEY FK_5D309286A76ED395');
        $this->addSql('ALTER TABLE vente_film DROP FOREIGN KEY FK_9215B83EA76ED395');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE commande');
        $this->addSql('DROP TABLE migration');
        $this->addSql('DROP TABLE pub');
        $this->addSql('DROP TABLE reset_password_request');
        $this->addSql('DROP TABLE test');
        $this->addSql('DROP TABLE `user`');
        $this->addSql('DROP TABLE vente_article');
        $this->addSql('DROP TABLE vente_film');
    }
}
