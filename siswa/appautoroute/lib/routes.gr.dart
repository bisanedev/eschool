// **************************************************************************
// AutoRouteGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// AutoRouteGenerator
// **************************************************************************
//
// ignore_for_file: type=lint

import 'package:appautoroute/aplikasi/ujian.dart' as _i3;
import 'package:appautoroute/guard.dart' as _i11;
import 'package:appautoroute/main_screens/aplikasi/aplikasi_screen.dart' as _i4;
import 'package:appautoroute/main_screens/base.dart' as _i2;
import 'package:appautoroute/main_screens/login/login_screen.dart' as _i1;
import 'package:appautoroute/main_screens/prestasi/prestasi_screen.dart' as _i5;
import 'package:appautoroute/main_screens/profile/foto_screen.dart' as _i9;
import 'package:appautoroute/main_screens/profile/password_screen.dart' as _i8;
import 'package:appautoroute/main_screens/profile/profile_screen.dart' as _i7;
import 'package:auto_route/auto_route.dart' as _i6;
import 'package:flutter/material.dart' as _i10;

class AppRouter extends _i6.RootStackRouter {
  AppRouter(
      {_i10.GlobalKey<_i10.NavigatorState>? navigatorKey,
      required this.checkIfAuthenticated})
      : super(navigatorKey);

  final _i11.CheckIfAuthenticated checkIfAuthenticated;

  @override
  final Map<String, _i6.PageFactory> pagesMap = {
    LoginRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i1.LoginScreen());
    },
    BaseRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i2.BaseScreen());
    },
    UjianRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i3.UjianScreen());
    },
    AplikasiRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i4.AplikasiScreen());
    },
    PrestasiRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i5.PrestasiScreen());
    },
    ProfileIndex.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i6.EmptyRouterPage());
    },
    ProfileRouter.name: (routeData) {
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData, child: const _i7.ProfileScreen());
    },
    PasswordRouter.name: (routeData) {
      final args = routeData.argsAs<PasswordRouterArgs>(
          orElse: () => const PasswordRouterArgs());
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData,
          child: _i8.PasswordScreen(key: args.key, userToken: args.userToken));
    },
    FotoRouter.name: (routeData) {
      final args = routeData.argsAs<FotoRouterArgs>(
          orElse: () => const FotoRouterArgs());
      return _i6.AdaptivePage<dynamic>(
          routeData: routeData,
          child: _i9.FotoScreen(key: args.key, userToken: args.userToken));
    }
  };

  @override
  List<_i6.RouteConfig> get routes => [
        _i6.RouteConfig(LoginRouter.name, path: '/login'),
        _i6.RouteConfig(BaseRouter.name, path: '/', guards: [
          checkIfAuthenticated
        ], children: [
          _i6.RouteConfig(AplikasiRouter.name,
              path: 'aplikasi', parent: BaseRouter.name),
          _i6.RouteConfig(PrestasiRouter.name,
              path: 'prestasi', parent: BaseRouter.name),
          _i6.RouteConfig(ProfileIndex.name,
              path: 'profile',
              parent: BaseRouter.name,
              children: [
                _i6.RouteConfig(ProfileRouter.name,
                    path: '', parent: ProfileIndex.name),
                _i6.RouteConfig(PasswordRouter.name,
                    path: 'password', parent: ProfileIndex.name),
                _i6.RouteConfig(FotoRouter.name,
                    path: 'foto', parent: ProfileIndex.name)
              ]),
          _i6.RouteConfig('*#redirect',
              path: '*',
              parent: BaseRouter.name,
              redirectTo: '/',
              fullMatch: true)
        ]),
        _i6.RouteConfig(UjianRouter.name,
            path: '/ujian', guards: [checkIfAuthenticated])
      ];
}

/// generated route for
/// [_i1.LoginScreen]
class LoginRouter extends _i6.PageRouteInfo<void> {
  const LoginRouter() : super(LoginRouter.name, path: '/login');

  static const String name = 'LoginRouter';
}

/// generated route for
/// [_i2.BaseScreen]
class BaseRouter extends _i6.PageRouteInfo<void> {
  const BaseRouter({List<_i6.PageRouteInfo>? children})
      : super(BaseRouter.name, path: '/', initialChildren: children);

  static const String name = 'BaseRouter';
}

/// generated route for
/// [_i3.UjianScreen]
class UjianRouter extends _i6.PageRouteInfo<void> {
  const UjianRouter() : super(UjianRouter.name, path: '/ujian');

  static const String name = 'UjianRouter';
}

/// generated route for
/// [_i4.AplikasiScreen]
class AplikasiRouter extends _i6.PageRouteInfo<void> {
  const AplikasiRouter() : super(AplikasiRouter.name, path: 'aplikasi');

  static const String name = 'AplikasiRouter';
}

/// generated route for
/// [_i5.PrestasiScreen]
class PrestasiRouter extends _i6.PageRouteInfo<void> {
  const PrestasiRouter() : super(PrestasiRouter.name, path: 'prestasi');

  static const String name = 'PrestasiRouter';
}

/// generated route for
/// [_i6.EmptyRouterPage]
class ProfileIndex extends _i6.PageRouteInfo<void> {
  const ProfileIndex({List<_i6.PageRouteInfo>? children})
      : super(ProfileIndex.name, path: 'profile', initialChildren: children);

  static const String name = 'ProfileIndex';
}

/// generated route for
/// [_i7.ProfileScreen]
class ProfileRouter extends _i6.PageRouteInfo<void> {
  const ProfileRouter() : super(ProfileRouter.name, path: '');

  static const String name = 'ProfileRouter';
}

/// generated route for
/// [_i8.PasswordScreen]
class PasswordRouter extends _i6.PageRouteInfo<PasswordRouterArgs> {
  PasswordRouter({_i10.Key? key, String? userToken})
      : super(PasswordRouter.name,
            path: 'password',
            args: PasswordRouterArgs(key: key, userToken: userToken));

  static const String name = 'PasswordRouter';
}

class PasswordRouterArgs {
  const PasswordRouterArgs({this.key, this.userToken});

  final _i10.Key? key;

  final String? userToken;

  @override
  String toString() {
    return 'PasswordRouterArgs{key: $key, userToken: $userToken}';
  }
}

/// generated route for
/// [_i9.FotoScreen]
class FotoRouter extends _i6.PageRouteInfo<FotoRouterArgs> {
  FotoRouter({_i10.Key? key, String? userToken})
      : super(FotoRouter.name,
            path: 'foto', args: FotoRouterArgs(key: key, userToken: userToken));

  static const String name = 'FotoRouter';
}

class FotoRouterArgs {
  const FotoRouterArgs({this.key, this.userToken});

  final _i10.Key? key;

  final String? userToken;

  @override
  String toString() {
    return 'FotoRouterArgs{key: $key, userToken: $userToken}';
  }
}
