System.register(['angular2/core', './question-container.service', "./question"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, question_container_service_1, question_1;
    var QuestionContainer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_container_service_1_1) {
                question_container_service_1 = question_container_service_1_1;
            },
            function (question_1_1) {
                question_1 = question_1_1;
            }],
        execute: function() {
            QuestionContainer = (function () {
                function QuestionContainer(_questionContainerService) {
                    this._questionContainerService = _questionContainerService;
                    this.questions = [];
                }
                /**
                 * @description: Called by ngOnInit, gets questions and initializes them to not selected
                 */
                QuestionContainer.prototype.getQuestions = function () {
                    var _this = this;
                    this._questionContainerService.getQuestions()
                        .subscribe(function (questions) {
                        for (var i = 0; i < questions.length; i++) {
                            console.log(questions[i]);
                            _this.questions.push(new question_1.Question());
                            _this.questions[i].QuestionText = questions[i];
                            _this.questions[i].Selected = false;
                            _this.questions[i].placeholder = "text placeholder";
                        }
                    }, function (error) { return _this.errorMessage = error; });
                };
                /**
                 * @description: On a selection of a question mark every
                 * other question as not selected
                 * @param selected
                 */
                QuestionContainer.prototype.selectQuestion = function (selected) {
                    this.questions.forEach((function (q) { return q.Selected = false; }));
                    selected.Selected = true;
                };
                ;
                QuestionContainer.prototype.ngOnInit = function () {
                    this.getQuestions();
                };
                QuestionContainer = __decorate([
                    core_1.Component({
                        selector: 'question-container',
                        providers: [question_container_service_1.QuestionContainerService],
                        templateUrl: 'app/question-container/question-container.component.html',
                        styleUrls: ['app/question-container/question-container.component.css']
                    }), 
                    __metadata('design:paramtypes', [question_container_service_1.QuestionContainerService])
                ], QuestionContainer);
                return QuestionContainer;
            }());
            exports_1("QuestionContainer", QuestionContainer);
        }
    }
});
//# sourceMappingURL=question-container.component.js.map