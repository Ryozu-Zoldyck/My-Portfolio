<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestbookMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'message',
        'avatar',
    ];

    /**
     * Human-readable relative time (in Indonesian)
     */
    public function getTimeAgoAttribute(): string
    {
        $diff = $this->created_at->diffInSeconds(now());
        if ($diff < 60) {
            return 'Baru saja';
        }
        $minutes = floor($diff / 60);
        if ($minutes < 60) {
            return $minutes . ' menit lalu';
        }
        $hours = floor($minutes / 60);
        if ($hours < 24) {
            return $hours . ' jam lalu';
        }
        $days = floor($hours / 24);
        return $days . ' hari lalu';
    }
}
