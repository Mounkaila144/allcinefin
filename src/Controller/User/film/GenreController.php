<?php

namespace App\Controller\User\film;

use App\Service\BetaseriesServices;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user/film', name: 'user_film_')]
class GenreController extends AbstractController
{
     #[Route('/action/{id}', name: 'action')]
    public function action(BetaseriesServices $callApiService,Request $request,
                          PaginatorInterface $paginator,int $id): Response
    {
        for ($i = 1; $i <= 30; $i++) {
            $film[] = $callApiService->getFilmByGenre($id,$i);
        }
        $film = array_merge(...$film);

        $debut = "https://image.tmdb.org/t/p/w500";
        $data = $paginator->paginate(
            $film,
            $request->query->getInt('page', 1),
            16
        );
        return $this->render('user/film/index.html.twig', [
            'data' => $data,
            'debut' => $debut,
        ]);
    }

    #[Route('/genre', name: 'genre')]
    public function genre(BetaseriesServices $callApiService,Request $request,
                          PaginatorInterface $paginator): Response
    {
        $film = $callApiService->genre();

        return $this->render('user/film/genre.html.twig', [
            'data' => $film,
        ]);

    }


}
