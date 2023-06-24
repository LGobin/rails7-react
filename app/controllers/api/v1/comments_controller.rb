class Api::V1::CommentsController < ApplicationController

  protect_from_forgery with: :null_session

  def create
    @comment = Comment.new(content: params[:content], question_id: params[:question_id])

    if @comment.save
      render json: @comment, status: :ok
    else
      render json: { errors: @comment.errors }, status: 400
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.content = params[:content]

    if @comment.save
      render json: @comment, status: :ok
    else
      render json: { errors: @comment.errors }, status: 400
    end
  end
end