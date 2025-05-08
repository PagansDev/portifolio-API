<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Project",
 *     title="Project",
 *     description="Modelo de Projeto",
 *     @OA\Property(property="id", type="integer", format="int64"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="thumbnail_url", type="string", nullable=true),
 *     @OA\Property(property="repository_url", type="string", nullable=true),
 *     @OA\Property(property="site_url", type="string", nullable=true),
 *     @OA\Property(property="technologies", type="array", @OA\Items(type="string")),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="type", type="string", enum={"web", "mobile", "desktop", "other"}),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'thumbnail_url',
        'repository_url',
        'site_url',
        'technologies',
        'description',
        'type'
    ];

    protected $casts = [
        'technologies' => 'array'
    ];
}