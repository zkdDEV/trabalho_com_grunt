module.exports = function(grunt)
{
    grunt.initConfig
    ({
        pkg: grunt.file.readJSON("package.json"),
        less:
        {
            development:
            {
                files:
                {
                    './dev/styles/main.css' : './src/styles/main.less'
                }
            },
            production:
            {
                options:
                {
                    compress: true
                },
                files:
                {
                    './dist/styles/main.min.css' : './src/styles/main.less'
                }
            }
        },
        watch:
        {
            less:
            {
                files: ['./src/styles/**/*.less'],
                tasks: ['less:development']
            }
        },
        htmlmin:
        {
            dist:
            {
                options:
                {
                    removeComments:true,
                    collapseWhitespace: true
                },
                files:
                {
                    './preBuild/index.html' : './src/index.html'
                }
            }
        },
        replace:
        {
            dev:
            {
                options:
                {
                    patterns:
                    [
                        {
                            match: 'LOCAL_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'LOCAL_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files:
                [
                    {
                        expand:true,
                        flatten:true,
                        src: ['./src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:
            {
                options:
                {
                    patterns:
                    [
                        {
                            match: 'LOCAL_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'LOCAL_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files:
                [
                    {
                        expand:true,
                        flatten:true,
                        src: ['preBuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        clean: ['preBuild'],
        uglify:
        {
            target: 
            {
                files:
                {

                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    /*----------------PLUGINS----------------*/
    // Comprime arquivos tipo .less
    grunt.loadNpmTasks('grunt-contrib-less')
    // Ve as mudanças do arquivo e atualiza
    grunt.loadNpmTasks('grunt-contrib-watch')
    // Comprime arquivos JS
    grunt.loadNpmTasks('grunt-contrib-uglify')
    // Comprime arquivos html
    grunt.loadNpmTasks('grunt-contrib-htmlmin')
    // Faz referência ao CSS e JS nas páginas HTML
    grunt.loadNpmTasks('grunt-replace')
    // Limpa arquivos que são inúteis
    grunt.loadNpmTasks('grunt-contrib-clean')



    // Tarefa Padrão
    grunt.registerTask('default', ['watch', 'replace:dev'])
    grunt.registerTask('build',["less:production", "htmlmin", "replace:dist", "clean", "uglify"] )
}
