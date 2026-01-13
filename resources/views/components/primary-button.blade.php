<button {{ $attributes->merge(['type' => 'submit', 'class' => 'text-white flex items-center py-2 px-3 rounded transition-colors bg-emerald-500 hover:bg-emerald-600']) }}>
    {{ $slot }}
</button>
