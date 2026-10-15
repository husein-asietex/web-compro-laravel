<?php

namespace App\Http\Requests\Dashboard;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductDraftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('product')) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gallery' => ['present', 'array'],
            'gallery.*' => [
                'string',
                'max:2048',
                function (string $attribute, mixed $value, Closure $fail): void {
                    if (! is_string($value) || (! str_starts_with($value, '/') && filter_var($value, FILTER_VALIDATE_URL) === false)) {
                        $fail("The {$attribute} field must be an HTTP(S) URL or a root-relative path.");

                        return;
                    }

                    if (str_starts_with($value, '/') || in_array(parse_url($value, PHP_URL_SCHEME), ['http', 'https'], true)) {
                        return;
                    }

                    $fail("The {$attribute} field must be an HTTP(S) URL or a root-relative path.");
                },
            ],
            'video_en' => ['nullable', 'url:http,https'], 'video_id' => ['nullable', 'url:http,https'], 'video_pt' => ['nullable', 'url:http,https'],
            'translations' => ['required', 'array:en,id,pt'], 'translations.*.title' => ['present', 'string', 'max:10000'], 'translations.*.body' => ['present', 'string', 'max:10000'],
            'translations.*.capacity' => ['nullable', 'string', 'max:500'], 'translations.*.products' => ['present', 'array'], 'translations.*.products.*' => ['required', 'string', 'max:500'], 'translations.*.machinery' => ['nullable', 'string', 'max:5000'],
        ];
    }
}
