@extends('layouts.app')

@section('content')
    <!-- Hero Section with 3D Lanyard Card -->
    @include('sections.hero')

    <!-- About Me Section -->
    @include('sections.about')

    <!-- Portfolio Projects, Skills & Certificates -->
    @include('sections.portfolio')

    <!-- Timeline Experience Section -->
    @include('sections.experience')

    <!-- Spotify Coding Soundtrack Section -->
    @include('sections.spotify')

    <!-- Contact & Live Guestbook Section -->
    @include('sections.contact')
@endsection

