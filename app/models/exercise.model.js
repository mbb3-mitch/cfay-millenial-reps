module.exports = mongoose => {

    const exerciseSchema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
        },
        { timestamps: true }
    );


    exerciseSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Exercise = mongoose.model("exercise", exerciseSchema);
    return Exercise;
};
