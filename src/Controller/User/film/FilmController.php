<?php

namespace App\Controller\User\film;

use App\Service\BetaseriesServices;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user/film', name: 'user_film_')]
class FilmController extends AbstractController
{

    #[Route('/popular', name: 'popular')]
    public function popular(BetaseriesServices $callApiService,Request $request,
                            PaginatorInterface $paginator): Response
    {
        return $this->themovie($callApiService, "popular", $paginator, $request);

    }
    #[Route('/top', name: 'top')]
    public function top(BetaseriesServices $callApiService,Request $request,
                        PaginatorInterface $paginator): Response
    {
        return $this->themovie($callApiService, "top_rated", $paginator, $request);

    }
    #[Route('/new', name: 'new')]
    public function new(BetaseriesServices $callApiService,Request $request,
                          PaginatorInterface $paginator): Response
    {
        return $this->themovie($callApiService, "upcoming", $paginator, $request);

    }

    /**
     * @param BetaseriesServices $callApiService
     * @param $type
     * @param PaginatorInterface $paginator
     * @param Request $request
     * @return Response
     */
    public function themovie(BetaseriesServices $callApiService, $type, PaginatorInterface $paginator, Request $request): Response
    {
        for ($i = 1; $i <= 10; $i++) {
            $film[] = $callApiService->getFilm($type, $i);
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


}
