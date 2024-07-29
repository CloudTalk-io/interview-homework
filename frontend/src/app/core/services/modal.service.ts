import { ComponentRef, Inject, Injectable, Injector, Optional } from '@angular/core';
import {
  ComponentType,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { first, Subject, takeUntil } from 'rxjs';
import { CdkPortal, ComponentPortal } from '@angular/cdk/portal';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

export class ModalRef<R = unknown> {
  afterClose = new Subject<R | undefined>();

  constructor(private overlayRef: OverlayRef) {}

  close(result?: R): void {
    this.overlayRef.dispose();
    this.afterClose.next(result);
    this.afterClose.complete();
  }
}

interface ModalConfig<D = unknown>
  extends Pick<
    OverlayConfig,
    | 'panelClass'
    | 'hasBackdrop'
    | 'backdropClass'
    | 'width'
    | 'height'
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
  > {
  positionStrategy?: GlobalPositionStrategy;
  data?: D;
  hasBackdropClick?: boolean;
  isCentered?: boolean;
  disableClose?: boolean;
}

const defaultConfig: ModalConfig = {
  hasBackdrop: true,
  backdropClass: 'modal--backdrop',
  hasBackdropClick: true,
  isCentered: true,
  width: '908px',
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    public overlay: Overlay,
    private injector: Injector,
    private router: Router,
  ) {}

  open<D, T = unknown>(templateRef: ComponentType<T> | CdkPortal, config: ModalConfig<D> = {}) {
    const modalConfig = {
      ...defaultConfig,
      ...config,
      data: {
        modalPortal: templateRef,
        disableClose: config?.disableClose,
        ...(typeof config?.data === 'object' ? config?.data : {}),
      },
    } as ModalConfig;
    const overlayConfig = this.getOverlayConfig(modalConfig);
    const overlayRef = this.overlay.create(overlayConfig);
    const modalRef = new ModalRef<D>(overlayRef);

    this.attachModalContainer(overlayRef, modalRef, templateRef, modalConfig.data);

    if (modalConfig.hasBackdropClick) {
      overlayRef.backdropClick().subscribe(() => {
        modalRef.close();
      });
    }

    this.router.events
      .pipe(
        first((event) => event instanceof RouterEvent && event instanceof NavigationStart),
        takeUntil(modalRef.afterClose),
      )
      .subscribe(() => modalRef.close());

    return modalRef;
  }

  private getOverlayConfig(config: ModalConfig): OverlayConfig {
    let positionStrategy = config.positionStrategy || this.overlay.position().global();

    if (config.isCentered) {
      positionStrategy = positionStrategy.centerHorizontally().centerVertically();
    }

    const overlayConfig = new OverlayConfig({
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      width: config.width,
      height: config.height,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private attachModalContainer<T, D>(
    overlayRef: OverlayRef,
    modalRef: ModalRef<D>,
    componentOrTemplate: ComponentType<T> | CdkPortal,
    data?: unknown,
  ) {
    if (componentOrTemplate instanceof CdkPortal) {
      const embeddedViewRef = overlayRef.attach(componentOrTemplate);
      embeddedViewRef.context = { $implicit: modalRef };
      return embeddedViewRef;
    }

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: 'modal-data', useValue: data },
      ],
    });
    const containerPortal = new ComponentPortal(componentOrTemplate, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }
}
