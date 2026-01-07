<x-app-layout>
    <div class="w-full sm:w-[400px] px-5 mx-auto mt-16 text-center">
        <h2 class="text-2xl font-semibold mb-2">Create new account</h2>
        <p class="mb-4">or <a href="{{ route('login') }}" class="text-purple-600 hover:text-purple-500 ">login with
                existing
                one</a></p>
        <form action="{{ route('register') }}" method="post">
            @csrf
            <div class="mb-3">
                <x-input type="text" name="name" placeholder="Your Name" value="{{ old('name') }}" />
            </div>
            <div class="mb-3">
                <x-input type="text" name="email" placeholder="Your Email" />
            </div>
            <div class="mb-3">
                <x-input type="password" name="password" placeholder="Password" />
            </div>

            <div class="mb-3">
                <x-input type="password" name="password_confirmation" placeholder="Repeat your Password" />
            </div>

            <button class="btn-emerald w-full flex items-center justify-center">
                Signup
            </button>
        </form>
    </div>
</x-app-layout>
