
module.exports = mongoose => {

    const workoutSchema = mongoose.Schema(
        {
            name: String,
            sets: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exercise_set'
            }],
            duration: Number,
        },
        { timestamps: true }
    );


    workoutSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Workout = mongoose.model("workout", workoutSchema);
    return Workout;
};
