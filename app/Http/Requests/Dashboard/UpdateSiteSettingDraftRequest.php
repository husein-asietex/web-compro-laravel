<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSiteSettingDraftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('siteSetting')) ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return ['catalog_url' => ['required', 'url:https'], 'catalog_on' => ['required', 'boolean'], 'catalog_label_en' => ['required', 'string', 'max:80'], 'catalog_label_id' => ['required', 'string', 'max:80'], 'catalog_label_pt' => ['required', 'string', 'max:80'], 'catalog_placements' => ['required', 'array', 'min:1'], 'catalog_placements.*' => [Rule::in(['home', 'product', 'footer'])], 'catalog_open_new_tab' => ['required', 'boolean']];
    }
}
