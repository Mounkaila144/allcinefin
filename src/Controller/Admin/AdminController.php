<?php

namespace App\Controller\Admin;

use App\Repository\ArticleRepository;
use App\Repository\CommandeRepository;
use App\Repository\UserRepository;
use App\Repository\VenteArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;

#[Route('/')]
class AdminController extends AbstractController
{
    #[Route('/admin', name: 'app_admin')]
    public function index(ArticleRepository $articleRepository,CommandeRepository $commandeRepository,
    UserRepository $userRepository,VenteArticleRepository $venteArticleRepository,ChartBuilderInterface $chartBuilder): Response
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
                    'backgroundColor' => '#ffab00',
                    'borderColor' => '#ffab00',
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

        $a=$articleRepository->findAll();
        $auth=[];
        foreach ($a as $as){
            $auth[]=$as->getId();
        }
        $e=$commandeRepository->findAll();
        $emplo=[];
        foreach ($e as $es){
            $emplo[]=$es->getId();
        }
        $g=$userRepository->findAll();
        $group=[];
        foreach ($g as $gs){
            $group[]=$gs->getId();
        }

        $n = $venteArticleRepository->findAll();
        $notif = [];
        foreach ($n as $gs) {
            $notif[] =$gs->getId();
        }
        $l = $articleRepository->alert();
        $notif = [];
        foreach ($l as $gs) {
            $notif[] =$gs->getId();
        }
        $s = $venteArticleRepository->sum();
        $j = $venteArticleRepository->jour();
        $m = $venteArticleRepository->moi();



        return $this->render('admin/dashboard.html.twig', [
            'arti' => count($auth),
            'comand' =>count($emplo) ,
            'user' =>count($group) ,
            'vente' =>count($notif) ,
            'alert'=>$l,
            'total'=>$s,
            'chart' => $chart,
        ]);
    }
    #[Route('/employee', name: 'app_employee')]
    public function employee(): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'controller_name' => 'AdminController',
        ]);
    }

}
