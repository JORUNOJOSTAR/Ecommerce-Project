
<?php
$defaultColor = 'focus:border-purple-600 focus:ring-purple-600';
$errorColor = 'border-red-600 focus:border-red-600 focus:ring-red-600 ring-1 ring-red-600';
$classes = 'bg-white w-full rounded border-gray-300 ';
$classes .= $errors->has($attributes['name']) ? $errorColor : $defaultColor;
?>

<input
{{ $attributes->merge([
    'class' => $classes
]) }}
/>

@error($attributes['name'])
<small class="block text-left text-red-600">{{ $message }}</small>
@enderror
