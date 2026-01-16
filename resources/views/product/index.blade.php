<x-app-layout>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 p-5">
        @foreach ($products as $product)
            <!-- Product item -->
            <div x-data="productItem({
                id: 1,
                image: 'img/1_1.jpg',
                title: 'Logitech G502 HERO High Performance Wired Gaming Mouse, HERO 25K Sensor, 25,600 DPI, RGB, Adjustable Weights, 11',
                price: 17.99
            })"
                class="bg-white  rounded-md shadow border border-gray-300 hover:border-purple-600 transition-colors overflow-hidden">
                <a href="{{ route('product.view', $product) }}">
                    <img src="{{ $product->image }}" alt=""
                        class="w-full rounded-t-md hover:scale-105 transition hover:rotate-1 aspect-3/2 object-cover">
                </a>
                <div class="p-3">
                    <h3 class="line-clamp-3">
                        <a href="{{ route('product.view', $product) }}"
                            class="hover:text-gray-800 text-black font-semibold">
                            {{ $product->title }}
                        </a>
                    </h3>
                    <p class="text-xl font-bold py-2">{{ $product->price }}</p>
                    <div class="cursor-pointer flex justify-between mt-3">
                        <button @click = "addToWatchList()"
                            class="flex items-center justify-center text-purple-600 transition-colors hover:text-white hover:bg-purple-500 active:bg-purple-800 border-purple-500 border-2  rounded-full w-10 h-10"
                            :class="isInWatchList() ? 'bg-purple-500 text-white' : 'text-purple-600'">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                        <button class="flex items-center btn-primary cursor-pointer" @click="addToCart(id)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" class="h-6 w-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    {{ $products->links('pagination::tailwind') }}
</x-app-layout>
