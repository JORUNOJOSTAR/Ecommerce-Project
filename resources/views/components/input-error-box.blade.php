@if ($errors->any())
    <div {{ $attributes->merge(['class'=>'w-full mb-3 p-3 bg-red-600 text-white text-left rounded-md']) }}>
        <p class="mb-1">Whoops! Something went wrong</p>
        <ul class="p-1 list-disc list-inside text-sm">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
