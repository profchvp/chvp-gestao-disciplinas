/**
 * 
 * IMPORTANTE: este é um "artifício para que seja criado uma "tipagem personalizada"
 * esta variavel está sendo utilizada no MIDDLEWARE "isAuthenticated".
 * Outro ponto impoertante:
 *      no arquivo "tsconfig.json":
 *                  
 *         "module": "commonjs",                                
 *         // "rootDir": "./",                                  
 *         // "moduleResolution": "node10",                     
 *         // "baseUrl": "./",                                  
 *         // "paths": {},                                      
 *         // "rootDirs": [],                                  
 *               "typeRoots": [
 *              "./src/@types"
 *              ],    
 */

declare namespace Express {
    export interface Request {
        user_id: string;
        papel_id: number;
    }
} 