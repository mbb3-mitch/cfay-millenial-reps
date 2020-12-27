module.exports = mongoose => {
    const setSchema = mongoose.Schema(
        {
            exercise_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'exercise',
                required: true,
            },
            reps: Number,
            duration: Number,
            workout_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'workout',
                required: true,
            },
        },
        {timestamps: true}
    );


    setSchema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Set = mongoose.model("exercise_set", setSchema);
    return Set;
};
