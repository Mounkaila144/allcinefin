<?php
// src/EventSubscriber/RequestSubscriber.php
namespace App\ExceptionSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Commande;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ExceptionSubscriber implements EventSubscriberInterface
{

    public function __construct(Security $security)
    {
        $this->security=$security;
    }

    public function curentUser(ViewEvent $event)
    {
        $commande=$event->getControllerResult();
        $method=$event->getRequest()->getMethod();
        if ($commande instanceof Commande && Request::METHOD_POST===$method){
            $commande->setUser($this->security->getUser());
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW=>['curentUser',EventPriorities::PRE_VALIDATE]
        ];
    }

    public function onKernelRequest(RequestEvent $event)
    {
        // ...
    }
}
