<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221209080832 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD delect TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE vente_article ADD delect TINYINT(1) DEFAULT NULL, CHANGE article_id article_id INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `user` DROP delect');
        $this->addSql('ALTER TABLE vente_article DROP delect, CHANGE article_id article_id INT DEFAULT NULL');
    }
}
