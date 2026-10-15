<?php

namespace App\Policies;

use App\Models\SiteSetting;
use App\Models\User;

class SiteSettingPolicy
{
    public function update(User $user, SiteSetting $siteSetting): bool
    {
        return $user->active;
    }

    public function publish(User $user, SiteSetting $siteSetting): bool
    {
        return $user->isAdmin();
    }
}
