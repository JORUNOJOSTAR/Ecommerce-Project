<x-app-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <div class="w-full sm:w-[400px] px-5 mx-auto mt-16 text-center">
        <h2 class="text-2xl font-semibold mb-2">Enter your email to reset password</h2>
        <p class="mb-4">or <a href="{{ route('login') }}" class="text-purple-600 hover:text-purple-500 ">login with
                existing account</a></p>
        <form class="/src/login.html" method="POST">
            @csrf
            <div class="mb-3">
                <x-input type="text" name="email" id="email" placeholder="Your Email" value="{{ old('email') }}" />
            </div>
            <button class="btn-emerald w-full flex items-center justify-center">
                Submit
            </button>
        </form>
    </div>
</x-app-layout>
