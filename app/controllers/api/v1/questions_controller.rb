class Api::V1::QuestionsController < ApplicationController

  protect_from_forgery with: :null_session

  def index
    if params[:tags].present? && params[:tags] != 'All'
      @questions = Question.where(tag: params[:tags])
    else
      @questions = Question.all
    end

    if params[:search].present? && params[:search] != ''
      @questions = @questions.where("title LIKE ?", "%#{params[:search]}%")
    end

    render json: @questions, status: :ok
  end

  def create
    @question = Question.new(title: params[:title], tag: params[:tag])

    if @question.save
      render json: @question, status: :ok
    else
      render json: { errors: @question.errors }, status: 400
    end
  end

  def update
    @question = Question.find(params[:id])
    @question.title = params[:title]
    @question.tag = params[:tag]

    if @question.save
      render json: @question, status: :ok
    else
      render json: { errors: @question.errors }, status: 400
    end
  end

  def update_counter
    @question = Question.find(params[:id])

    if params[:count] == 'like'
      @question.update(likes_count: @question.likes_count + 1)
    elsif params[:count] == 'dislike'
      @question.update(dislikes_count: @question.dislikes_count + 1)
    end

    render json: @question, status: :ok
  end

end