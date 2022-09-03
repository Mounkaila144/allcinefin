<?php

namespace App\Controller;

use App\Repository\VenteArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;

class UxController extends AbstractController
{
    #[Route('/ux', name: 'app_ux')]
    public function index(ChartBuilderInterface $chartBuilder,VenteArticleRepository $venteArticleRepository): Response
    {
        $time = new \DateTime('@' . strtotime('now'));
        $debut = $time->format('t');
        $day=intval($debut);
        $labels=range(0,$day);
        $data=[];
        foreach ($labels as $dailyresult){
            $value=$venteArticleRepository->findbyday($dailyresult);

                $data[]=$value;

        }

        $chart = $chartBuilder->createChart(Chart::TYPE_LINE);
        $chart->setData([
            'labels' =>$labels,
            'datasets' => [
                [
                    'label' => "Nombre d'article vendue",
                    'backgroundColor' => 'rgb(255, 99, 132)',
                    'borderColor' => 'rgb(255, 99, 132)',
                    'data' => $data,
                ],
            ],
        ]);

        $chart->setOptions([
            'scales' => [
                'y' => [
                    'suggestedMin' => 0,
                    'suggestedMax' => 50,
                ],
            ],
        ]);
        return $this->render('ux/index.html.twig', [
            'controller_name' => 'UxController',
            'chart' => $chart,
        ]);
    }
}
