<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * @OA\Info(
 *     version="2.0.0",
 *     title="Portfolio API",
 *     description="API para gerenciamento de projetos do portfolio",
 *     @OA\Contact(
 *         email="seu-email@exemplo.com"
 *     )
 * )
 */
class ProjectController extends Controller
{

    use AuthorizesRequests, DispatchesJobs;

    /**
     * @OA\Get(
     *     path="/api/projects",
     *     summary="Lista todos os projetos",
     *     tags={"Projetos"},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de projetos",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="thumbnail_url", type="string"),
     *                 @OA\Property(property="repository_url", type="string"),
     *                 @OA\Property(property="site_url", type="string"),
     *                 @OA\Property(property="technologies", type="array", @OA\Items(type="string")),
     *                 @OA\Property(property="description", type="string"),
     *                 @OA\Property(property="type", type="string")
     *             )
     *         )
     *     )
     * )
     */
    public function index()
    {
        return Project::all();
    }

    /**
     * @OA\Post(
     *     path="/api/projects",
     *     summary="Cria um novo projeto",
     *     tags={"Projetos"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "technologies", "description", "type"},
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="thumbnail_url", type="string"),
     *             @OA\Property(property="repository_url", type="string"),
     *             @OA\Property(property="site_url", type="string"),
     *             @OA\Property(property="technologies", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="type", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Projeto criado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function store(Request $request)
    {

        try {



            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'thumbnail_url' => 'nullable|url',
                'repository_url' => 'nullable|url',
                'site_url' => 'nullable|url',
                'technologies' => 'required|array',
                'technologies.*' => 'string',
                'description' => 'required|string',
                'type' => 'required|string|in:web,mobile,desktop,other'
            ]);

            return Project::create($validated);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar projeto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/projects/{id}",
     *     summary="Obtém um projeto específico",
     *     tags={"Projetos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projeto encontrado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     )
     * )
     */
    public function show(Project $project)
    {
        return $project;
    }

    /**
     * @OA\Put(
     *     path="/api/projects/{id}",
     *     summary="Atualiza um projeto",
     *     tags={"Projetos"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="thumbnail_url", type="string"),
     *             @OA\Property(property="repository_url", type="string"),
     *             @OA\Property(property="site_url", type="string"),
     *             @OA\Property(property="technologies", type="array", @OA\Items(type="string")),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="type", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Projeto atualizado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function update(Request $request, Project $project)
    {

        try {


            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'thumbnail_url' => 'nullable|url',
                'repository_url' => 'nullable|url',
                'site_url' => 'nullable|url',
                'technologies' => 'sometimes|required|array',
                'technologies.*' => 'string',
                'description' => 'sometimes|required|string',
                'type' => 'sometimes|required|string|in:web,mobile,desktop,other'
            ]);

            $project->update($validated);
            return $project;
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar projeto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/projects/{id}",
     *     summary="Remove um projeto",
     *     tags={"Projetos"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do projeto",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Projeto removido com sucesso"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autorizado"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Projeto não encontrado"
     *     )
     * )
     */
    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
