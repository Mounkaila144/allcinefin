<?php


namespace App\Service;


use App\Entity\Commande;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class BetaseriesServices
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function getFilm(Commande $commande): array
    {


        return $result['results'];
    }

    public function getSerie(string $type,int $page): array
    {
        $response = $this->client->request(
            'GET',
            "https://api.themoviedb.org/3/tv/$type?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&page=$page"
        );

        $result = $response->toArray();

        return $result['results'];
    }

     public function getFilmByGenre(int $genre,int $page): array
    {
        $response = $this->client->request(
            'GET',
            "https://api.themoviedb.org/3/discover/movie?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=$page&with_genres=$genre"
        );

        $result = $response->toArray();

        return $result['results'];
    }
     public function getSerieByGenre(int $genre,int $page): array
    {
        $response = $this->client->request(
            'GET',
            "https://api.themoviedb.org/3/discover/tv?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR&sort_by=popularity.desc&page=$page&timezone=America%2FNew_York&with_genres=$genre&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0"
        );

        $result = $response->toArray();

        return $result['results'];
    }

    public function genre(): array
    {
        $response = $this->client->request(
            'GET',
            'https://api.themoviedb.org/3/genre/movie/list?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR'
        );

        $result = $response->toArray();

        return $result['genres'];
    }
 public function genreSerie(): array
    {
        $response = $this->client->request(
            'GET',
            "https://api.themoviedb.org/3/genre/tv/list?api_key=7220ce44fed075da0c331991d5c64c0d&language=fr-FR"
        );

        $result = $response->toArray();

        return $result['genres'];
    }

}
