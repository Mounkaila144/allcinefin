<?php

namespace App\Controller\User\serie;

use App\Service\BetaseriesServices;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user/serie', name: 'user_serie_')]
class GenreController extends AbstractController
{
     #[Route('/action/{id}', name: 'action')]
    public function action(BetaseriesServices $callApiService,Request $request,
                          PaginatorInterface $paginator,int $id): Response
    {
        for ($i = 1; $i <= 30; $i++) {
            $serie[] = $callApiService->getSerieByGenre($id,$i);
        }
        $serie = array_merge(...$serie);

        $debut = "https://image.tmdb.org/t/p/w500";
        $data = $paginator->paginate(
            $serie,
            $request->query->getInt('page', 1),
            16
        );
        return $this->render('user/serie/index.html.twig', [
            'data' => $data,
            'debut' => $debut,
        ]);
    }

    #[Route('/genre', name: 'genre')]
    public function genre(BetaseriesServices $callApiService,Request $request,
                          PaginatorInterface $paginator): Response
    {
        $serie = $callApiService->genreSerie();

        return $this->render('user/serie/genre.html.twig', [
            'data' => $serie,
        ]);

    }


}
