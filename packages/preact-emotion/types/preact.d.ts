// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.6

import { ComponentConstructor, ComponentFactory, FunctionalComponent, Ref } from 'preact';
import { ClassInterpolation } from 'create-emotion';
import {
  Interpolation,
  StyledOptions,
  StyledOtherProps,
  StyledStatelessProps,
  Themed,
} from 'create-emotion-styled/types/common';

export interface StyledComponentMethods<Props extends object, InnerProps extends object, Theme extends object> {
  withComponent<T extends keyof JSX.IntrinsicElements>(
    tag: T,
    options?: StyledOptions,
  ): StyledOtherComponent<Props, JSX.IntrinsicElements[T], Theme>;

  withComponent<IP extends object>(
    component: FunctionalComponent<IP>,
    options?: StyledOptions,
  ): StyledStatelessComponent<Props, IP, Theme>;

  withComponent<IP extends object>(
    component: ComponentConstructor<IP> | ComponentFactory<IP>,
    options?: StyledOptions,
  ): StyledOtherComponent<Props, IP, Theme>;
}

export interface StyledStatelessComponent<Props extends object, InnerProps extends object, Theme extends object>
  extends ComponentConstructor<StyledStatelessProps<Props & InnerProps, Theme>>,
    ClassInterpolation,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export interface StyledOtherComponent<Props extends object, InnerProps extends object, Theme extends object>
  extends ComponentConstructor<StyledOtherProps<Props & InnerProps, Theme, Ref<any>>>,
    ClassInterpolation,
    StyledComponentMethods<Props, InnerProps, Theme> {}

export type StyledComponent<Props extends object, InnerProps extends object, Theme extends object> =
  | StyledStatelessComponent<Props, InnerProps, Theme>
  | StyledOtherComponent<Props, InnerProps, Theme>
  ;

export interface CreateStyledStatelessComponent<InnerProps extends object, Theme extends object> {
  <Props extends object, OverridedTheme extends object = Theme>(
    ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
  ): StyledStatelessComponent<Props, InnerProps, OverridedTheme>;
}

export interface CreateStyledOtherComponent<InnerProps extends object, Theme extends object> {
  <Props extends object, OverridedTheme extends object = Theme>(
    ...args: Array<Interpolation<Themed<Props, OverridedTheme>>>
  ): StyledOtherComponent<Props, InnerProps, OverridedTheme>;
}

export interface CreateStyledFunction<Theme extends object> {
  <T extends keyof JSX.IntrinsicElements>(
    tag: T,
    options?: StyledOptions,
  ): CreateStyledOtherComponent<JSX.IntrinsicElements[T], Theme>;

  <IP extends object>(
    component: FunctionalComponent<IP>,
    options?: StyledOptions,
  ): CreateStyledStatelessComponent<IP, Theme>;

  <IP extends object>(
    component: ComponentConstructor<IP> | ComponentFactory<IP>,
    options?: StyledOptions,
  ): CreateStyledOtherComponent<IP, Theme>;
}

export type CreateStyledShorthands<Theme extends object> = {
  [T in keyof JSX.IntrinsicElements]: CreateStyledOtherComponent<JSX.IntrinsicElements[T], Theme>;
};

export interface CreateStyled<Theme extends object = any>
  extends CreateStyledFunction<Theme>,
    CreateStyledShorthands<Theme> {}
