<?php

namespace App\Http\Requests\Dashboard;

use App\Models\MediaAsset;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreMediaAssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('create', MediaAsset::class) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return ['url' => ['required', 'url:https'], 'alt_en' => ['required', 'string', 'max:200'], 'alt_id' => ['required', 'string', 'max:200'], 'alt_pt' => ['required', 'string', 'max:200'], 'credit' => ['nullable', 'string', 'max:200'], 'page_id' => ['nullable', 'integer', 'exists:pages,id', 'prohibited_if:product_id,!=,null'], 'product_id' => ['nullable', 'integer', 'exists:products,id']];
    }
}
